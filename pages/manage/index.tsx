import { NextPage } from 'next'
import ManageComponent from '../../components/Manage/ManageComponent'
import Sidebar from '../../components/Sidebar/Sidebar'

interface Props {}

const Index: NextPage<Props> = ({}) => {
  return (
    <section className='flex flex-row w-full h-screen overflow-hidden'>
        <Sidebar />
        <ManageComponent />
    </section>
  )
}

export default Index