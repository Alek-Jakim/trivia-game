import connectToDB from "../../../config/db.config.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie"

export default async (req, res) => {
    if (req.method === "POST") {

        const { username, email, password } = await req.body;

        await connectToDB.end();

        const checkUserExists = await connectToDB.query(`SELECT COUNT(*) FROM user WHERE user.email = ?`, [email]);

        const userExists = Object.values(JSON.parse(JSON.stringify(checkUserExists)))[0]["COUNT(*)"];

        if (userExists) {
            return res.status(400).json({
                error: "User already exists!"
            })
        } else {

            try {

                // HASH PASSWORD
                const salt = await bcrypt.genSalt(10);

                const hashedPassword = await bcrypt.hash(password, salt);

                const newUser = await connectToDB.query(`INSERT INTO user(username, email, password) VALUES(?, ?, ?)`, [username, email, hashedPassword]);

                let token = jwt.sign({ newUser }, process.env.JWT_SECRET, { expiresIn: "1h" });

                res.setHeader("Set-Cookie", cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    sameSite: "strict",
                    path: "/" // this means it's available from everywhere
                }));

                console.log(newUser)

                return res.status(200).json({ username, email, id: newUser.insertId });
            }
            catch (e) {
                return res.json({
                    error: e.message
                })
            }
        }

    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ error: `Method ${req.method} not allowed.` })
    }
}