import { lazy } from 'react'

import { TPermission } from '../types'

const Home = lazy(() => import("../views/home"))

const SessionList = lazy(() => import("../views/sessions"))
const SessionCreate = lazy(() => import("../views/sessions/SessionCreate"))
const SessionDetail = lazy(() => import("../views/sessions/SessionDetail"))

const BeneficiariesList = lazy(() => import("../views/beneficiaries"))
const BeneficiaryCreate = lazy(() => import("../views/beneficiaries/BeneficiaryCreate"))

const ReportsList = lazy(() => import("../views/reports"))
const ReportCreate = lazy(() => import("../views/reports/ReportCreate"))

const routes = (permissions: TPermission) => {
    return [
        {
            canSee: true,
            path: "/home",
            component: Home
        },
        {
            canSee: permissions.createSession,
            path: '/sessions',
            component: SessionList
        },
        {
            canSee: permissions.createSession,
            path: '/sessions/create',
            component: SessionCreate
        },
        {
            canSee: permissions.createSession,
            path: '/sessions/:id/edit',
            component: SessionCreate
        },
        {
            canSee: true,
            path: '/sessions/:id',
            component: SessionDetail
        },
        {
            canSee: permissions.createBeneficiary,
            path: '/beneficiaries',
            component: BeneficiariesList
        },
        {
            canSee: permissions.createBeneficiary,
            path: '/beneficiaries/create',
            component: BeneficiaryCreate
        },
        {
            canSee: permissions.createBeneficiary,
            path: '/beneficiaries/:id/edit',
            component: BeneficiaryCreate
        },
        {
            canSee: permissions.createReport,
            path: '/reports',
            component: ReportsList
        },
        {
            canSee: permissions.createReport,
            path: '/reports/create',
            component: ReportCreate
        },
        {
            canSee: permissions.createReport,
            path: '/reports/:id/edit',
            component: ReportCreate
        }
    ]
}

export default routes