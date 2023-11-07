const Loading = () => (
  <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex align-middle justify-center m-0 bg-[#00000088]" style={{ zIndex: 1000 }}>
    <div className="col flex justify-center">
      <span className="loading loading-bars loading-lg bg-white mb-20"></span>
    </div>
  </div>
);

export default Loading;
