import React from 'react';

import Layout from '@/Layouts/Layout';

import PageContainer from '@/Layouts/Contenedor/PageContainer';

import CardComponent from '@/Components/Card/CardComponent';
import CardHeader from '@/Components/Card/CardHeader';
import CardContent from '@/Components/Card/CardContent';

const breadcrumbs = [
    { label: "Inicio", isActive: true },
];

export default function Dashboard(props) {
    return (
        <Layout auth={props.auth}>
            <PageContainer heading={"Pacientes"} breadcrumbs={breadcrumbs}>
                <CardComponent>
                    <CardHeader title={"Lista de Pacientes"} subTitle={"Filtra por RUT o Ficha"} />
                    <CardContent>
                    </CardContent>
                </CardComponent>
            </PageContainer>
        </Layout>
    );
}
