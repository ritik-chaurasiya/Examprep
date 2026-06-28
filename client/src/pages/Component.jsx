import React from 'react'

const Component = () => {
  // return (
  //   <div>Page not found</div>
  // )
  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      <div className="row justify-content-center align-items-center min-vh-100">

        <div className="col-12 col-md-8 col-lg-6">

          <div
            className="card border-0 shadow-lg text-center"
            style={{
              borderRadius: "30px",
            }}
          >
            {/* Header */}
            <div
              className="card-header border-0 py-4"
              style={{
                background:
                  "linear-gradient(90deg,#4F46E5,#7C3AED)",
                borderTopLeftRadius: "30px",
                borderTopRightRadius: "30px",
              }}
            >
              <h1 className="display-1 fw-bold text-white mb-0">
                404
              </h1>

              <h3 className="text-white">
                Page Not Found
              </h3>
            </div>

            {/* Body */}
            <div className="card-body py-5">

              <div
                className="rounded-circle mx-auto mb-4 d-flex justify-content-center align-items-center"
                style={{
                  width: "120px",
                  height: "120px",
                  background: "#EEF2FF",
                }}
              >
                <i
                  className="fa-solid fa-triangle-exclamation"
                  style={{
                    fontSize: "55px",
                    color: "#4F46E5",
                  }}
                ></i>
              </div>

              <h2
                className="fw-bold"
                style={{ color: "#4F46E5" }}
              >
                Oops!
              </h2>

              <p className="text-muted fs-5 mb-4">
                The page you're looking for doesn't exist or has been moved.
              </p>

              <Link
                to="/userdash"
                className="btn btn-lg text-white px-5"
                style={{
                  background:
                    "linear-gradient(90deg,#4F46E5,#7C3AED)",
                  borderRadius: "30px",
                }}
              >
                <i className="fa-solid fa-house me-2"></i>
                Back to Dashboard
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Component