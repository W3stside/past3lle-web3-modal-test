import { PstlWeb3ModalProps, addConnector } from '@past3lle/web3-modal'
import { mainnet } from '@wagmi/chains'
import modalTheme, { PALETTE } from 'theme'

import { LedgerConnector } from 'wagmi/connectors/ledger'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { LedgerHIDConnector } from '@past3lle/wagmi-connectors'

enum WalletRank {
  'ledger' = 10,
  'walletConnect' = 2,
  'web3auth' = 1,
  'injected' = 0
}

enum ZIndices {
  BASE = 500,
  W3M = 600,
  W3A = 700
}

const chains = [mainnet]
const WC_PROJECT_ID = 'a01e2f3b7c64ff495f9cb28e4e2d4b49'
const WEB3AUTH_TEST_ID = 'BHloyoLW113nGn-mIfeeNqj2U0wNCXa4y83xLnR6d3FELPMz_oZ7rbY4ZEO3r0MVjQ_LX92obu1ta0NknOwfvtU'

const config: PstlWeb3ModalProps<number> = {
  appName: 'Test App',
  chains,
  connectors: [
    addConnector(LedgerConnector, { projectId: WC_PROJECT_ID, walletConnectVersion: 2 }),
    addConnector(InjectedConnector, {
      name: 'MetaMask',
      shimDisconnect: true,
      getProvider() {
        return (window.ethereum as any)?.providerMap?.get('MetaMask') || window.ethereum
      }
    }),
    addConnector(InjectedConnector, {
      name: 'CoinbaseWallet',
      shimDisconnect: true,
      getProvider() {
        return (window as any)?.coinbaseWalletExtension
      }
    }),
    addConnector(InjectedConnector, {
      name: 'Taho',
      shimDisconnect: true,
      getProvider() {
        return (window as any)?.tally
      }
    }),
    addConnector(LedgerHIDConnector, {})
  ],
  options: {
    pollingInterval: 10_000
  },
  modals: {
    root: {
      walletsView: 'grid',
      closeModalOnConnect: true,
      zIndex: ZIndices.BASE,
      title: 'CHORUS ONE CONNECT',
      themeConfig: {
        theme: modalTheme
      },
      loaderProps: {
        containerProps: {
          backgroundColor: '#000000c9'
        },
        spinnerProps: {
          size: 60
        }
      },
      connectorDisplayOverrides: {
        web3auth: {
          logo: 'https://www.pngkit.com/png/full/178-1783296_g-transparent-circle-google-logo.png',
          customName: 'GMAIL/MOBILE',
          // Uncomment to add helper text under connectors
          // infoText: {
          //   title: 'What is this option?',
          //   content:
          //     'Choose this to connect with familiar social/mobile login methods. Web3Auth handles making a self-custodial account for you which is accessible via Torus wallet.'
          // },
          rank: WalletRank['web3auth']
        },
        walletconnect: {
          logo: 'https://repository-images.githubusercontent.com/204001588/a5169900-c66c-11e9-8592-33c7334dfd6d',
          // Uncomment to add helper text under connectors
          // infoText: {
          //   title: 'What is this option?',
          //   content: 'Choose this to open the WalletConnect wallet modal and select a 3rd party wallet of your choice!'
          // },
          rank: WalletRank['walletConnect']
        },
        metamask: {
          logo:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png',
          isRecommended: true,
          rank: WalletRank['ledger'] - 1,
          downloadUrl: 'https://metamask.io/download'
        },
        taho: {
          logo: 'https://user-images.githubusercontent.com/95715502/221033622-fb606b37-93f1-485b-9ce5-59b92f756033.png',
          isRecommended: true,
          rank: WalletRank['ledger'] - 1,
          downloadUrl: 'https://taho.xyz'
        },
        coinbasewallet: {
          logo: 'https://altcoinsbox.com/wp-content/uploads/2022/12/coinbase-logo.webp',
          isRecommended: true,
          rank: WalletRank['ledger'] - 1
        },
        ledger: {
          logo:
            'https://play-lh.googleusercontent.com/mHjR3KaAMw3RGA15-t8gXNAy_Onr4ZYUQ07Z9fG2vd51IXO5rd7wtdqEWbNMPTgdqrk',
          customName: 'LEDGER LIVE',
          // Uncomment to add helper text under connectors
          // infoText: {
          //   title: 'What is this option?',
          //   content: 'Choose this to connect with your Ledger hardware wallet via the LedgerLive desktop app!'
          // },
          modalNodeId: 'ModalWrapper',
          isRecommended: true,
          rank: WalletRank['ledger']
        },
        'ledger-hid': {
          customName: 'LEDGER HID',
          logo: 'https://crypto-central.io/library/uploads/Ledger-Logo-3.png',
          rank: 10,
          isRecommended: true,
          infoText: {
            title: 'What is Ledger HID?',
            content: <strong>Ledger wallet is a cold storage hardware wallet.</strong>
          }
        }
      }
    },
    web3auth: {
      appName: 'Test App',
      projectId: WEB3AUTH_TEST_ID,
      network: 'testnet',
      preset: 'DISALLOW_EXTERNAL_WALLETS'
    },
    walletConnect: {
      // test id, don't use in prod!
      projectId: WC_PROJECT_ID,
      zIndex: 1000,
      themeMode: 'dark',
      themeVariables: {
        '--w3m-overlay-background-color': PALETTE.blackOpaque3,
        '--w3m-background-color': PALETTE.mainBg,
        '--w3m-background-image-url':
          'https://uploads-ssl.webflow.com/63fdf8c863bcf0c02efdffbc/64144c23e693f7d7f5cdb958_chorus_logo.svg',
        '--w3m-accent-color': PALETTE.mainBg,
        '--w3m-color-bg-1': PALETTE.blackOpaque1
      }
    }
  }
}

export default config
