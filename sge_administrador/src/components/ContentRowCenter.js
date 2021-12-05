import React from 'react';
import LastAlumnoInBD from './alumnos/LastAlumnoInBD';
import LastBecarioInBD from './becarios/LastBecarioInBD';
import LastEquipoInBD from './equipos/LastEquipoInBD';
import LastPrestamoInBD from './prestamos/LastPrestamoInBD';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastBecarioInBD />
            <LastEquipoInBD />
            <LastAlumnoInBD />
            <LastPrestamoInBD />
            {/*<!-- End content row last movie in Data Base -->*/}
            {/*<!-- Genres in DB -->*/}
        </div>
    )
}

export default ContentRowCenter;