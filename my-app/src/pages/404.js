export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', top: '50%', left: '50%' }}>
      <h1 className='text-3xl md:text-5xl font-bold mb-2'>
        404 Page Not Found
      </h1>
      <hr />
      <p className='text-center text-lg md:text-md'>
        The page you were looking for may be unavailable. Please try again
        later.
      </p>
    </div>
  );
}
