import connectDB from "../../lib/db";
import Product from "../../models/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();

    return new Response(JSON.stringify(products), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
