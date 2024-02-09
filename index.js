const web3 = require("@solana/web3.js");
const bs58 = require("bs58");

const connection = new web3.connection("https://nd-029-387-613.p2pify.com/2433eced3f7945449359316047f242e4");

const privatekey = new
    Uint8Array(bs58.decode(process.env['PRIVATE_KEY']));

const account = web3.Keypair.fromSecretKey(privatekey);

const account2 = web3.Keypair.generate();

(async () => {
    const transaction = new web3.transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: account.publicKey,
            toPubkey: account2.publicKey,
            lamports: web3.LAMPORTS_PER_SOL * 0.0302,
        }),
    );

    const signature = await web3.sendAndConfirmRawTransaction(
        connection,
        transaction,
        [account],
    );
})();