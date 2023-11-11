const Error = () => {
  const [showError, setShowError] = useState(true);
  return (
    <div
      className='fixed w-full h-full top-0 left-0 right-0 bottom-0 flex align-middle justify-center m-0 bg-[#00000088]'
      style={{ zIndex: 1000 }}>
      <button onClick={() => setShowError(false)}>Close Message</button>
      <img className='mx-auto h-24 w-auto' src='/logo.png' alt='CMDR' />
      <h1 className='text-center text-xl text-primary font-bold leading-9 tracking-tight text-gray-900'>
        500 Server Side Error
      </h1>
      <p className='mt-6 text-secondary text-center text-xl font-semibold'>
        There was an error connecting to the server. Please try again later.{' '}
        <br />
        If the error continues, please contact management through the Contact
        Forms.
      </p>
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => setShowError(false)}>Close Error</button>
      </div>
    </div>
  );
};

export default Error;
