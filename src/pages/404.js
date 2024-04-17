import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function Page404() {
  const history = useHistory();

  return (
    <div className="flex flex-col items-center pt-[120px]">
      <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">404</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Page not found. Check the address or{' '}
        <div className="text-purple-600 hover:underline dark:text-purple-300 cursor-pointer" onClick={() => {history.goBack()}}>
          go back
        </div>
      </p>
    </div>
  )
}

export default Page404
