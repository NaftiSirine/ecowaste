
function Footer() {


    return (
      <footer className='footer'>
        <div className='container'>
          <div className='border-top '>
            <div className='row align-items-center'>
              <div className='col-md-6'>
                <span className='small text-muted'>
                  Copyright {new Date().getFullYear()} © EcoWaste . All rights
                  reserved. Powered by{" "}
                  <a href='https://codescandy.com/'>Dev'Up</a>.
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  export default Footer;
  