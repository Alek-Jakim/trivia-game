import connectToDB from "../../../../config/db.config.js"
import bcrypt from "bcrypt"

export default async (req, res) => {
    if (req.method === "PUT") {

        const { id } = req.query;

        await connectToDB.end();

        let user = await connectToDB.query("SELECT * FROM user WHERE user_id = ?", [id]);

        if (!user) {
            return res.status(400).json({
                error: "User not found!"
            })
        }

        const { password } = await user[0];

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const updatePassword = await connectToDB.query("UPDATE user SET password = ? WHERE user_id = ?", [hashedPassword, id]);

        return res.status(200).json(updatePassword);

    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).json({ error: `Method ${req.method} not allowed.` })
    }
}