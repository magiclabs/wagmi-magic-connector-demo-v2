## Magic Wagmi Connector Demo

This demo showcases how to use Magic's dedicated wallet connector alongside MetaMask in a Next.js 15.4.6 application written in TypeScript.

### Getting Started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Create a `.env.local` file with your Magic API key

   ```
   NEXT_PUBLIC_MAGIC_API_KEY=your_key_here
   ```

3. Run the development server

   ```bash
   yarn dev
   ```

The app exposes both Magic and MetaMask connectors. Use the sign-in buttons on the homepage to connect with your preferred wallet.

For full documentation on the Magic connector please [visit the repo](https://github.com/magiclabs/wagmi-magic-connector).

