import { useState, useEffect } from 'react'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from 'algorand-walletconnect-qrcode-modal'
import algosdk from 'algosdk'
import { formatJsonRpcRequest } from '@json-rpc-tools/utils'
import { ButtonPrimary } from '~/components'
import type { MetaFunction } from 'remix'

export let meta: MetaFunction = () => {
  return {
    title: 'Wallet Page',
    description: 'Welcome to remix!',
  }
}

export default function Wallet() {
  const [connector, setConnector] = useState<WalletConnect | null>(null)

  const signTransaction = async () => {
    console.log('🏀 connector =>', connector)

    if (connector) {
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: 'ALICEU3WMO5XYJVSODKJSYLFILIXXBEXHKIVSMX7GMGXJAYGFCJKVSQTUE',
        to: 'HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA',
        amount: 100000,
        suggestedParams: {
          firstRound: 0,
          lastRound: 0,
          genesisHash: '',
          genesisID: '',
          flatFee: true,
          fee: 1000,
        },
      })
      const txns = [txn]
      const txnsToSign = txns.map((txn) => {
        const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64')

        return {
          txn: encodedTxn,
          message: 'Description of transaction being signed',
        }
      })

      const requestParams = [txnsToSign]
      const request = formatJsonRpcRequest('algo_signTxn', requestParams)
      const result: Array<string | null> = await connector.sendCustomRequest(request)
      const decodedResult = result.map((element) => {
        return element ? new Uint8Array(Buffer.from(element, 'base64')) : null
      })
      console.log('🏀 decodedResult =>', decodedResult)
    }
  }

  useEffect(() => {
    setConnector(
      new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
        qrcodeModal: QRCodeModal,
      }),
    )
  }, [])

  useEffect(() => {
    if (connector) {
      // If not connected, create a session
      if (!connector.connected) connector.createSession()

      // Subscribe to events
      connector.on('connect', (error, payload) => {
        console.log('🏀 `connect` event =>', payload)
        if (error) throw error

        const { accounts } = payload.params[0]
        console.log('🏀 `connect` event accounts =>', accounts)
      })

      connector.on('session_update', (error, payload) => {
        console.log('🏀 `session_update` event =>', payload)
        if (error) throw error

        const { accounts } = payload.params[0]
        console.log('🏀 `session_update` event accounts =>', accounts)
      })

      connector.on('disconnect', (error, payload) => {
        console.log('🏀 `disconnect` event =>', payload)
        if (error) throw error
      })
    }

    // Cleanup
    return () => {
      if (connector) connector.killSession()
    }
  }, [connector])

  console.log('🏀 connector =>', connector)

  return (
    <>
      <h1>Wallet page</h1>

      <ButtonPrimary onClick={signTransaction}>Sign Transaction</ButtonPrimary>
    </>
  )
}
