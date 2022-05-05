import connectToDB from "../../config/db.config";

export default async function handler(req, res) {
    if (req.method === "GET") {

        const url = await connectToDB.query("SELECT url_string FROM url");

        await connectToDB.end();

        return res.json(url);

    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ message: `Method ${req.method} not allowed.` })
    }
}
