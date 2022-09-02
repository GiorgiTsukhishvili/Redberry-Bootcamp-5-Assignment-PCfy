import React, { Fragment } from "react";

import "../../styles/form/FormPageTop.scss";

const FormPageTop = ({ page }: { page: boolean }) => {
  return (
    <Fragment>
      <div className="form__all">
        <div className="form__all__user">
          <h1 className="form__all__user__header">თანამშრომლის ინფო</h1>
          {page ? <span></span> : ""}
        </div>
        <div className="form__all__laptop">
          <h1 className="form__all__laptop__header">ლეპტოპის მახასიათებელი</h1>
          {!page ? <span></span> : ""}
        </div>
      </div>
      {page ? (
        <div className="form__user">
          <h1 className="form__user__header">თანამშრომლის ინფო</h1>
          <span>1/2</span>
        </div>
      ) : (
        <div className="form__laptop">
          <h1 className="form__laptop__header">ლეპტოპის მახასიათებელი</h1>
          <span>2/2</span>
        </div>
      )}
    </Fragment>
  );
};

export default FormPageTop;
