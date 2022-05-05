import connectToDB from "../../../config/db.config.js"
import { passwordMatch } from "../../../utils/passwordMatch.js";
import jwt from "jsonwebtoken"
import cookie from "cookie";

export default async (req, res) => {
    if (req.method === "POST") {

        let { email, password } = await req.body;

        await connectToDB.end();

        if (!email) {
            return res.status(400).json({ error: "Missing user data!" });
        }

        let user = await connectToDB.query("SELECT * FROM user WHERE email = ?", [email]);

        const userData = Object.values(JSON.parse(JSON.stringify(user)))[0];


        if (!user || !userData) {
            return res.status(404).json({ error: "No user found!" });
        }

        let correctPassword = await passwordMatch(password, userData.password);

        if (!correctPassword) {
            return res.status(401).json({
                error: "Wrong credentials!"
            })
        } else {

            let token = jwt.sign({ username: userData.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.setHeader("Set-Cookie", cookie.serialize("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: "strict",
                path: "/" // this means it's available from everywhere
            }));

            return res.status(200).json({ username: userData.username, email: userData.email, id: userData.user_id });
        }

    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ error: `Method ${req.method} not allowed.` })
    }
}