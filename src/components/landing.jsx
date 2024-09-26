
import React from 'react';
import '../styles/landing.css';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

  const handleProceedClick = () => {
    navigate('/login');
  };
  return (
    <div className="landing">
      <div className="image-container">
        <div className="image-wrapper">
          <img src="https://home.microsoftpersonalcontent.com/contentstorage/coJsE0OdIkqu2uEOCncHOQAAAAAAAAAAapCosRtIKy4/_layouts/15/download.aspx?UniqueId=10061b99-0deb-4e26-b063-9a5a6647f0f6&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiI1NTk0NTY3My04YWMxLTRlOWUtYmNhMS02ZGJkZTUzNjk5NTIiLCJhcHBfZGlzcGxheW5hbWUiOiJEZXNpZ25lciIsImFwcGlkIjoiNWUyNzk1ZTMtY2U4Yy00Y2ZiLWIzMDItMzVmZTVjZDAxNTk3IiwiYXVkIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwL2hvbWUubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzI2NDAyMzQzIn0.-sTlO1kUVI0gbU4JMzYoJzgm0kW8hQQGPCPqrYurXw81kJgVyqfCKqKZZnlUno3_a4_0E38GqHdOiojRvw8Pxkkku-9Yrj_DysQur73DcvNthGg4iVEm9nuv55AEqr4YWQVFYAO8To4-UiWo87IeK9zxRMLHtLMM_dtLoySD5FuPuh81P1oXuvFTGYP2sufLQkmqCrRW76cdfpp8e-tyazYkrWCwS_U1bSO_xttSocM0tn7oZshxOu4yKICBfLCQ0bGYkwDmhjMgMzzTnxZ6A9HXx5RwqaNpfKdlI-Idazah0amNG_nUaAYlTbcCEWyfH1iB7zQcXOODxYGlEQhfyL5b9JWpi05kZxZi9nFuxGD9cTYdmGNlfY__4GAx8HKhLdovMryaS_8Q0Rax5wy5Sw.ewW5eFRbx4V5YbbhdTl0FsTdQn__DckSoLrI1HjspAo&ApiVersion=2.1" alt="Arogya Mitra 1" className="background-image" />
          <div className="overlay"></div>
          <div className="content">
          </div>
        </div>
        <div className="image-wrapper">
          <img src="https://home.microsoftpersonalcontent.com/contentstorage/coJsE0OdIkqu2uEOCncHOQAAAAAAAAAAapCosRtIKy4/_layouts/15/download.aspx?UniqueId=2d02b7b4-a378-4e4d-a057-7330e888c9f1&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiI1NTk0NTY3My04YWMxLTRlOWUtYmNhMS02ZGJkZTUzNjk5NTIiLCJhcHBfZGlzcGxheW5hbWUiOiJEZXNpZ25lciIsImFwcGlkIjoiNWUyNzk1ZTMtY2U4Yy00Y2ZiLWIzMDItMzVmZTVjZDAxNTk3IiwiYXVkIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwL2hvbWUubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzI2NDAyMzQzIn0.bmGWxChSBIi3EhNQZwQe9pD7fzaBCXIsZugdBeNlvBSheM23B15OFamJRwuJuq6eluJwIRbDAVa31runtRbYvrVlUxubhsCUKpvCn1NeeOzzszV3f8RMiN8qgqEAJOwACm7zDMWFqSnGoMActZDoD17MB-L1WoOSc16gjsl9f98uRQ6UQOHviRWJ90yU1gKr5pDPfyTAUXx7YTGVZOUoGnu_gdxo_F2UNz_FLsNfxG17n6Isf6VIr7Sg7SrV0DKYXohgJdjuOWai3ASXS_1kaoY_zeL9uKJDH3kPk9gUzI1Dq9XihIM4-SbIXwqJRn-M5R1-hi7No4Rdb8FpUfwnjLcxKEPgMwVkeHffWQr_KUkCG_a3YAK_UbABNysgnlirirRyGp94CK6H4ga7hnxvsQ.5p2zboDl2p2ivzu6X62gPCl3WruPKdM6UH8nucDOM8w&ApiVersion=2.1" alt="Arogya Mitra 2" className="background-image" />
          <div className="overlay"></div>
          <div className="content">
            <h1>Arogya Mitra</h1>
            <h2>Your Health,Our Priority</h2>
          </div>
        </div>
        <div className="image-wrapper">
          <img src="https://home.microsoftpersonalcontent.com/contentstorage/coJsE0OdIkqu2uEOCncHOQAAAAAAAAAAapCosRtIKy4/_layouts/15/download.aspx?UniqueId=dd8a3af2-0729-4b86-a8aa-f1632d17b1ca&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiI1NTk0NTY3My04YWMxLTRlOWUtYmNhMS02ZGJkZTUzNjk5NTIiLCJhcHBfZGlzcGxheW5hbWUiOiJEZXNpZ25lciIsImFwcGlkIjoiNWUyNzk1ZTMtY2U4Yy00Y2ZiLWIzMDItMzVmZTVjZDAxNTk3IiwiYXVkIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwL2hvbWUubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzI2NDAyMzQzIn0.AMfIliPViv8kN8TcdCNsWsLICCXMV7W07JpXg5UUZv7-pYe4JvLhcXpO5q0DysNgb6M4argsXGuEsyoxguZ9vQ0SFx3K9iABQR_p6Evk1XkQFnGker92TE3jH5kVQfWVZtgxDEWB2yOejRPjC8jH7CkGa4v66cza--3Jt5bZEMYOcpuDZVGzN-enLIi0qBZ4nx4Pkgx46KhkySyE4M0vq86nrL4MTwyOJzKviiQhTi-ruRuRcdmdU4X0x0HewLZvJKaHtSMIwEWJbk9QFOZS3gAUeipIkSrOgr7RAItbys6u9sMSxDNsd9_rgzN8SadjIk2cy_HBVqxHjyeGT_wpAn2a4ZFcQ_4SZO98iZDYEjtM8j6iyfeZBjnqTRoDmgnF5CeoB3SmiG8IenZteZh_dQ.HtKBu3CWdsBwJLrYeculuq9ZAX51Fa1gyHVNleZFT-I&ApiVersion=2.1" alt="Arogya Mitra 3" className="background-image" />
          <div className="overlay"></div>
          <div className="content">
          </div>
        </div>
      </div>
      <button  onClick={handleProceedClick} className="proceed-button">Proceed</button>
    </div>
  );
}

export default Landing;
