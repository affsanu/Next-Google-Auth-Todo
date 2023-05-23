import connectDB from "../../lib/db";
import Product from "../../models/Product";

export async function POST(req) {
  try {
    await connectDB();

    const { email, name, price, quantity } = await req.json();
    if (!email) {
        return new Response(
          JSON.stringify({ error: "Login please...!" }),
          { status: 404 }
        );
      }

    if (!name || !price || !quantity) {
      return new Response(
        JSON.stringify({ error: "All field must be filled!" }),
        { status: 404 }
      );
    }
    const product = await Product.create({ name, email, price, quantity });

    return new Response(JSON.stringify({success: "Product store success!"}), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
