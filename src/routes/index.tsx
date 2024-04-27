import { lazy } from 'react'

const SessionList = lazy(() => import("../views/sessions"))
const SessionCreate = lazy(() => import("../views/sessions/SessionCreate"))
const SessionDetail = lazy(() => import("../views/sessions/SessionDetail"))

const BeneficiariesList = lazy(() => import("../views/beneficiaries"))
const BeneficiaryCreate = lazy(() => import("../views/beneficiaries/BeneficiaryCreate"))

const ReportsList = lazy(() => import("../views/reports"))
const ReportCreate = lazy(() => import("../views/reports/ReportCreate"))

type IRoute<P extends {} = {}> = {
	path: string;
	component: React.ComponentType<P>;
}

const routes: IRoute[] = [
    {
        path: "/sessions",
        component: SessionList
    },
    {
        path: '/sessions/create',
        component: SessionCreate
    },
    {
        path: '/sessions/:id/edit',
        component: SessionCreate
    },
    {
        path: '/sessions/:id',
        component: SessionDetail
    },
    {
        path: '/beneficiaries',
        component: BeneficiariesList
    },
    {
        path: '/beneficiaries/create',
        component: BeneficiaryCreate
    },
    {
        path: '/beneficiaries/:id/edit',
        component: BeneficiaryCreate
    },
    {
        path: '/reports',
        component: ReportsList
    },
    {
        path: '/reports/create',
        component: ReportCreate
    },
    {
        path: '/reports/:id/edit',
        component: ReportCreate
    }
]

export default routes