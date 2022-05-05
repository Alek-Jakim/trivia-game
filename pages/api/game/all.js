import connectToDB from "../../../config/db.config";

export default async function handler(req, res) {
    if (req.method === "GET") {

        const allResults = await connectToDB.query("SELECT * FROM game_result");

        return res.status(200).json(allResults);

    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ message: `Method ${req.method} not allowed.` })
    }
}