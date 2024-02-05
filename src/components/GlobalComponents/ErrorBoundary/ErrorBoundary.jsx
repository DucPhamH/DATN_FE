import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error)
    console.log(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className='bg-white w-full h-screen'>
          <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
            <div className='mx-auto max-w-screen-sm text-center'>
              <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-content '>500</h1>
              <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl'>Something went wrong !</p>
              <p className='mb-4 text-lg font-light text-gray-500'>Có lỗi gì đó xảy ra vui lòng quay lại trang chủ !</p>
            </div>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
