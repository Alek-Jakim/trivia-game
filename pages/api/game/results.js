import connectToDB from "../../../config/db.config";

export default async function handler(req, res) {
    if (req.method === "POST") {

        const { correct_answers, score, difficulty, username, user_id } = await req.body;

        await connectToDB.end();


        if (!correct_answers || !score || !difficulty || !user_id) {
            return res.status(500).json({
                error: "Game results could not be submited."
            });
        }

        const newGameResults = await connectToDB.query("INSERT INTO game_result(correct_answers, score, difficulty, username, user_id) VALUES(?, ?, ?, ?, ?)", [correct_answers, score, difficulty, username, user_id]);

        if (newGameResults) {
            return res.status(200).json({ success: "Game results submitted succesfully!" });
        } else {
            return res.status(500).json({ error: "Game results could not be submited." });
        }

    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ message: `Method ${req.method} not allowed.` })
    }
}