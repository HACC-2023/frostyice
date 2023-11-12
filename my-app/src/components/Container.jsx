const Container = ({ children }) => {
  return (
    <div className="p-10 flex flex-col gap-3 bg-base-100 lg:m-3 lg:rounded-3xl text-primary min-h-screen">
      {children}
    </div>
  )
}

export default Container;