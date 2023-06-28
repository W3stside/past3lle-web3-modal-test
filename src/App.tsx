import { useMemo, useState } from 'react'
import PSTL_MODAL_CONFIG from './config'
import { PstlW3Providers, usePstlConnection } from '@past3lle/web3-modal'

function InnerApp() {
  const [, { openPstlW3Modal, openW3Modal }, { address }] = usePstlConnection()

  return (
    <div className="InnerApp">
      {address && <h2>Address: {address}</h2>}

      <br />
      <button
        style={{
          padding: '1rem',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '1rem',
          outline: 'none',
          color: 'ghostwhite',
          cursor: 'pointer',
          border: 'none',
          boxShadow: '2px 2px 0px 2px black'
        }}
        onClick={() => (address ? openW3Modal({ route: 'Account' }) : openPstlW3Modal({ route: 'ConnectWallet' }))}
      >
        {address ? 'VIEW ACCOUNT INFO' : 'OPEN WEB3 MODAL'}
      </button>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<'list' | 'grid'>('list')
  // TODO: should prob make this logic default in lib
  // But tbh most ppl wouldn't add a modal "view" switcher in their app anyway...
  const moddedConfig = useMemo(() => {
    const config = Object.assign({}, PSTL_MODAL_CONFIG)
    ;(config.modals.pstl || {}).walletsView = view
    return config
  }, [view])

  return (
    <>
      <h1>Hello!</h1>
      <h2>Click below to see grid view and list view modals in action</h2>
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
      <button onClick={() => setView(currView => (currView === 'list' ? 'grid' : 'list'))}>
        CHANGE MODAL VIEW TYPE: {view === 'list' ? 'GRID' : 'LIST'}
      </button>
      <PstlW3Providers config={moddedConfig}>
        <InnerApp />
      </PstlW3Providers>
    </>
  )
}
