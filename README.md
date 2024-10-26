# Product Management System

This project is a simple product management system written in Motoko. The system provides functionality for adding products, listing products, viewing a specific product, and updating product stock status.

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Code Explanation](#code-explanation)
- [Functions](#functions)

## Installation

1. Set up the Motoko development environment. You can follow the necessary steps in the [Dfinity Motoko Setup Guide](https://sdk.dfinity.org/docs/developers-guide/setup.html).
2. Clone or download the project:
   ```bash
   git clone <project-repo-url>
   ```
3. Navigate into the project directory:
   ```bash
   cd <project-directory>
   ```
   Build the Motoko project:
```dfx build```

  Start the local replica:
```dfx start```

  Deploy the canisters:
```dfx deploy```

4. Build the project using the following command:
   ```bash
   npm run build
   ```

## Usage

This system allows users to add products, view existing products, and update the stock status of products. You can interact with the following functions:

- `addProduct(name: Text, price: Nat, description: Text) : async Nat` - Adds a new product.
- `getAllProducts() : async [Product]` - Returns a list of all products.
- `getProduct(id: Nat) : async ?Product` - Returns a product by its ID.
- `updateStockStatus(id: Nat, inStock: Bool) : async Bool` - Updates the stock status of a product.

## Code Explanation

### Imported Modules

- **Array, Iter**: Contains array and iterator functions.
- **Nat, Text**: Provides numeric and text data types.
- **Hash, HashMap**: Supplies hashing and hashmap data structures.
- **Principal**: Used for identity (principal) operations.

### Product Type Definition

```motoko
public type Product = {
    id: Nat;
    name: Text;
    price: Nat;
    description: Text;
    inStock: Bool;
};
```

- **id**: The unique identifier for the product.
- **name**: The name of the product.
- **price**: The price of the product.
- **description**: The description of the product.
- **inStock**: A boolean indicating whether the product is in stock.

### Variables

```motoko
private stable var nextProductId: Nat = 0;
private var products = HashMap.HashMap< Nat, Product>(0, Nat.equal, Hash.hash);
```

- **nextProductId**: Holds the unique ID to be assigned to new products.
- **products**: A HashMap used to store products.

## Functions

### `addProduct`
Adds a new product and returns its ID.

### `getAllProducts`
Returns a list of all products.

### `getProduct`
Returns a product by its ID.


### `updateStockStatus`
Updates the stock status of a product and returns whether the operation was successful.


![4](https://github.com/user-attachments/assets/c2171620-4452-4133-8e4e-c6f6c998bf1d)


![5](https://github.com/user-attachments/assets/61cafc2f-1a56-4731-bf52-eb9a66c031bc)




