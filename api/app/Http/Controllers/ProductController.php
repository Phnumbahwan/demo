<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        $products =  Product::all();

        if($products->count() > 0) {
            return response()->json([
                'status' => 'success',
                'products' => $products
            ]);
        }else {
            return response()->json([
                'message' => 'Product is empty!'
            ]);
        }
    }

    public function store(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'name' => 'required|max:166',
            'description' => 'required|max:166',
            'price' => 'required|integer'
        ]);

        if($validated->fails()) {
            return response()->json([
                'message' => $validated->messages()
            ]);
        }else {
            Product::create($request->all());

            $products = Product::all();

            return response()->json([
                'message' => 'Product Added Successfully',
                'products' => $products
            ]);
        }
    }

    public function show($id)
    {
        $product = Product::find($id);

        if($product) {
            return response()->json([
                'status' => 'success',
                'product' => $product
            ]);
        }else {
            return response()->json([
                'message' => 'No Product Found!'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validated = Validator::make($request->all(), [
            'name' => 'required|max:166',
            'description' => 'required|max:166',
            'price' => 'required|integer'
        ]);

        if($validated->fails()) {
            return response()->json([
                'message' => $validated->messages()
            ]);
        }else {
            $product = Product::find($id);

            if($product) {
                $product->update($request->all());

                return response()->json([
                    'message' => 'Product Updated Successfully',
                    'product' => $product
                ]);
            }else {
                return response()->json([
                    'message' => 'No Product Found!'
                ]);
            }
        }
    }

    public function delete($id)
    {
        $product = Product::find($id);

        if($product) {
            $product->delete();
            $products = Product::all();
            return response()->json([
                'message' => 'Product Deleted Successfully',
                'remaining products' => $products
            ]);
        }else {
            return response()->json([
                'message' => 'No Product Found!'
            ]);
        }
    }
}
