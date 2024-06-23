const config = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    }, 
    experimental: {
        serverActions: {
          bodySizeLimit: '50mb',
        },
      },
}

export default config
