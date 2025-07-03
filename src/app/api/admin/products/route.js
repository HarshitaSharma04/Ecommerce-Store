import { dummyProducts } from "@/data/admin-dummy-data/products-data";

let products = [...dummyProducts];

// fetch all products
export async function GET() {
  try {
    return new Response(
      JSON.stringify({
        success: true,
        message: "Products fetched successfully",
        data: products,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch data" }),
      { status: 500 }
    );
  }
}

// create products
export async function POST(req) {
  try {
    const body = await req.json();
    const newProduct = {};
    return new Response(
      JSON.stringify({
        success: true,
        message: "Products created successfully",
        data: newProduct,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Failed to create product" }),
      { status: 500 }
    );
  }
}

// // update products
// export async function PUT(req) {
//   try {
//   } catch (error) {

//   }
// }
