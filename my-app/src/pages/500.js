export default function Custom500() {
  return (
    <div style={{ textAlign: 'center', top: '50%', left: '50%' }}>
      <h1 className='text-3xl md:text-5xl font-bold mb-2'>
        500 Server Side Error
      </h1>
      <hr />
      <p className='text-center text-lg md:text-md'>
        There was an error connecting to the server. Please try again later.
      </p>
    </div>
  );
}
