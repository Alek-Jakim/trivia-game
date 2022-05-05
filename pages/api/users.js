import connectToDB from "../../config/db.config"

export default async function handler(req, res) {
  if (req.method === "GET") {

    const users = await connectToDB.query("SELECT * FROM user");

    await connectToDB.end();

    if (!users) {
      return res.status(404).json({ message: "No users were found." });
    } else {
      return res.status(200).json(users);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed.` })
  }
}
