import { PstlWeb3ModalProps } from '@past3lle/web3-modal'
import { mainnet } from '@wagmi/chains'
import modalTheme, { PALETTE } from 'theme'

import { LedgerConnector } from 'wagmi/connectors/ledger'

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

const config = {
  appName: 'Test App',
  chains,
  wagmiClient: {
    options: {
      pollingInterval: 10_000,
      connectors: [new LedgerConnector({ chains, options: { projectId: WC_PROJECT_ID } })]
    }
  },
  modals: {
    pstl: {
      zIndex: ZIndices.BASE,
      title: 'CHORUS ONE CONNECT',
      themeConfig: {
        theme: modalTheme
      },
      hideInjectedFromRoot: true,
      connectorDisplayOverrides: {
        web3auth: {
          logo: 'https://www.pngkit.com/png/full/178-1783296_g-transparent-circle-google-logo.png',
          customName: 'GMAIL & MOBILE',
          // Uncomment to add helper text under connectors
          // infoText: {
          //   title: 'What is this option?',
          //   content:
          //     'Choose this to connect with familiar social/mobile login methods. Web3Auth handles making a self-custodial account for you which is accessible via Torus wallet.'
          // },
          rank: WalletRank['web3auth']
        },
        walletConnect: {
          // Uncomment to add helper text under connectors
          // infoText: {
          //   title: 'What is this option?',
          //   content: 'Choose this to open the WalletConnect wallet modal and select a 3rd party wallet of your choice!'
          // },
          rank: WalletRank['walletConnect']
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
          rank: WalletRank['ledger']
        }
      }
    },
    w3a: {
      appName: 'Test App',
      projectId: WEB3AUTH_TEST_ID,
      network: 'testnet',
      preset: 'DISALLOW_EXTERNAL_WALLETS'
    },
    w3m: {
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
} as PstlWeb3ModalProps<number>

export default config
