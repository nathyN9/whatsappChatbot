import React from 'react';
// import DataGrid from '@mui/x-data-grid'

const MasterQuestions=()=>{
    return(
        <div className="w-full">
            <h2 className="text-4xl text-emerald-700 text-center mt-10 mb-10">Preguntas</h2>
            {/* <DataGrid
                rows={8}
                columns={3}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />  */}
        </div>
    )

}

export default MasterQuestions