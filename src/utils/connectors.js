
export const getChainId = (network) => {
    let ChainId;

    switch (network) {
        case 'ethereum':
            ChainId = 1;
            break;
        case 'arbitrum':
            ChainId = 42161;
            break;
        case 'bsc':
            ChainId = 56;
            break;
        case 'avax':
            ChainId = 43114;
            break;
        case 'polygon':
            ChainId = 137;
            break;
        case 'puppy':
            ChainId = 719;
            break;

        default:
            break;
    }
    return ChainId;
}

export const switchNetwork = async (network = 'ethereum', status = false, isOpen = false) => {
    try {
        const provider = window;
        if (provider.ethereum) {
            const chainId = await provider.ethereum.request({ method: 'eth_chainId' });
            let ChainId;
            switch (network) {
                case 'ethereum':
                    ChainId = '0x1';
                    break;
                case 'arbitrum':
                    ChainId = '0xa4b1';
                    break;
                case 'bsc':
                    ChainId = '0x38';
                    break;
                case 'avax':
                    ChainId = '0xA86A';
                    break;
                case 'polygon':
                    ChainId = '0x89';
                    break;
                case 'puppy':
                    ChainId = '0x2cf';
                    break;

                default:
                    break;
            }

            if (chainId === ChainId) return;
            try {
                await provider.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: ChainId }]
                });
            } catch (switchError) {
                console.log(switchError);
            }
        } else if (!status && isOpen) {
            window.open('https://metamask.io/download/');
        }
    } catch (error) {
        console.log(error);
    }
};
