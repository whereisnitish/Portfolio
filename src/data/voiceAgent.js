/**
 * Vapi voice agent configuration.
 *
 * `publicKey` is Vapi's *public* browser key — it is designed to be shipped to
 * the client and is safe in the bundle. Never put a Vapi private key here.
 *
 * Both values can be overridden at build time with VITE_VAPI_PUBLIC_KEY and
 * VITE_VAPI_ASSISTANT_ID, which is handy for pointing staging at a different
 * assistant without editing source.
 */
export const voiceAgent = {
  publicKey: import.meta.env.VITE_VAPI_PUBLIC_KEY ?? 'ce91db6f-02e2-4169-ae30-23b2e07f284e',
  assistantId:
    import.meta.env.VITE_VAPI_ASSISTANT_ID ?? 'a039b282-da25-435f-9127-ff02ac07e0a5',

  copy: {
    idle: 'Talk to my agent',
    idleHint: 'Voice · powered by AI',
    connecting: 'Connecting',
    connectingHint: 'Allow microphone access',
    active: 'End call',
    activeHint: 'Listening',
    error: 'Could not connect',
    errorHint: 'Check your microphone and try again',
  },
}

/** True when the widget has enough configuration to attempt a call. */
export const voiceAgentEnabled = Boolean(voiceAgent.publicKey && voiceAgent.assistantId)
