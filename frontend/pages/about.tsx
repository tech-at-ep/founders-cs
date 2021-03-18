import Navbar from '../components/navbar'

export default function about() {
    return (<div className="h-screen w-screen grid grid-rows-5">
    <Navbar isLanding={false}/>
    <div className='row-start-2 m-auto font-extrabold text-4xl'> About Page To Do </div>
</div>);
}