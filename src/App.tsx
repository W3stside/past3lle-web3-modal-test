import PSTL_MODAL_CONFIG from './config'
import { PstlW3Providers, usePstlConnection } from '@past3lle/web3-modal'

function InnerApp() {
  const [, { openPstlW3Modal, openW3Modal }, { address }] = usePstlConnection()

  return (
    <div className="InnerApp">
      <h1>Hello!</h1>
      <h2>Click below to see the modal in action</h2>
      <h3>
        Example config can be found{' '}
        <a
          href="https://github.com/PAST3LLE/monorepo/blob/main/packages/web3-modal/src/fixtures/config.tsx"
          target="_blank noreferrer"
        >
          here
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/PAST3LLE/monorepo/blob/main/packages/web3-modal/src/fixtures/provider.fixture.tsx"
          target="_blank noreferrer"
        >
          also here!
        </a>
      </h3>

      {address && <h2>Address: {address}</h2>}

      <button
        onClick={() => (address ? openW3Modal({ route: 'Account' }) : openPstlW3Modal({ route: 'ConnectWallet' }))}
      >
        {address ? 'VIEW ACCOUNT INFO' : 'OPEN PAST3LLE MODAL'}
      </button>
    </div>
  )
}

export default function App() {
  return (
    <PstlW3Providers config={PSTL_MODAL_CONFIG}>
      <InnerApp />
    </PstlW3Providers>
  )
}
