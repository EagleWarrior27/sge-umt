import React from 'react';
import ContentRowCenter from './ContentRowCenter';
{/*import ContentRowMovies from './ContentRowMovies';*/}

function ContentRowTop(){
    return(
        <React.Fragment>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					{/*<!-- Content Row Movies-->*/}
					<br />
					<h2>SGE UMT</h2>
					<hr />
					{/*<ContentRowMovies />*/}
					
					<ContentRowCenter />
				</div>
				{/*<!--End Content Row Top-->*/}

        </React.Fragment>
    )

}
export default ContentRowTop;