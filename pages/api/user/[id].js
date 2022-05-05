import connectToDB from "../../../config/db.config"

export default async function handler(req, res) {
    if (req.method === "GET") {

        const { id } = await req.query;

        await connectToDB.end();

        if (!id) {
            return res.status(400).json({
                error: "Invalid parameters."
            })
        }

        const singleUserResults = await connectToDB.query("SELECT * FROM game_result WHERE game_result.user_id = ?", [id]);

        if (!singleUserResults) {
            return res.status(404).json({
                error: "User does not exist!"
            })
        } else {
            return res.status(200).json({ singleUserResults })
        }


    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ message: `Method ${req.method} not allowed.` })
    }
}
