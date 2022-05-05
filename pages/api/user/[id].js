import connectToDB from "../../config/db.config"

export default async function handler(req, res) {
    if (req.method === "GET") {


    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ message: `Method ${req.method} not allowed.` })
    }
}
