import connectToDB from "../../config/db.config";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const newUrl = await req.body;

            const emptyTable = await connectToDB.query("TRUNCATE TABLE url");

            await connectToDB.end();

            if (emptyTable.affectedRows === 0 || emptyTable.affectedRows === 1) {
                const newEntry = await connectToDB.query("INSERT INTO url(url_string) VALUES(?)", [newUrl.url_string]);

                return res.status(200).json(newEntry);
            } else {
                return res.status(400).json({
                    error: "No new URL was provided."
                });
            }
        }
        catch (e) {
            return res.status(500).json({
                message: e.message
            })
        }

    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ message: `Method ${req.method} not allowed.` })
    }
}