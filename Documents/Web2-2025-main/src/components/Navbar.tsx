import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { BellIcon } from "@heroicons/react/16/solid"
import { NavLink, useNavigate } from "react-router-dom"

const navigation = [
	{ name: 'Product', to: '/product', current: true },
	{ name: 'Recipes', to: '/recipes', current: false },
	{ name: 'Comments', to: '/comments', current: false },
	{ name: 'Post', to: '/posts', current: false },
	{ name: 'Todos', to: '/todos', current: false},
]


function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<Disclosure as="nav" className="bg-[#403D94]">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

					<Menu as="div" className="relative ml-3 md:hidden">
							<div>
								<MenuButton className="relative flex rounded-full bg-[#444370] text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#444370] focus:outline-hidden">
									<span className="absolute -inset-1.5" />
									<span className="sr-only">Open Mobile Nav</span>
									<img
										alt="Your Company"
										src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
										className="h-8 w-auto"
									/>
								</MenuButton>
							</div>
							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
							>
								<MenuItem>
									<a
										href="#"
										onClick={() => navigate(("/"))}
										className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
									>
										Home
									</a>
								</MenuItem>
								<MenuItem>
									<a
										href="#"
										onClick={() => navigate(("/product"))}
										className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
									>
										Product
									</a>
								</MenuItem>
								<MenuItem>
									<a
										href="#"
										onClick={() => navigate(("/recipes"))}
										className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
									>
										Recipes
									</a>
								</MenuItem>
								<MenuItem>
									<a	
										href="#"
										onClick={() => navigate(("/comments"))}
										className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
									>
										Carts
									</a>
								</MenuItem>
								<MenuItem>
									<a
										href="#"
										onClick={() => navigate(("/posts"))}
										className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
									>
										Post
									</a>
								</MenuItem>
							</MenuItems>
						</Menu>
						<div className="hidden md:flex shrink-0 items-center">
							<button className="hover:bg-[#444370] p-1 rounded-full focus:bg-[#212142]" onClick={() => navigate(("/"))}>
								<img
									alt="Your Company"
									src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
									className="h-8 w-auto"
								/>
							</button>
						</div>
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-4">
								{navigation.map((item) => (
									<NavLink to={item.to} key={item.name}
										className={({isActive}) => {
												return classNames(
													isActive ? 'bg-[#212142] text-white' : 'text-gray-300 hover:bg-[#444370] hover:text-white',
													'rounded-md px-3 py-2 text-sm font-medium',
												)
										}}>
										{item.name}
									</NavLink>
								))}
							</div>
						</div>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<button
							type="button"
							className="relative rounded-full bg-[#444370] p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#444370] focus:outline-hidden"
						>
							<span className="absolute -inset-1.5" />
							<span className="sr-only">View notifications</span>
							<BellIcon aria-hidden="true" className="size-6" />
						</button>

						{/* Profile dropdown */}
						<Menu as="div" className="relative ml-3">
							<div>
								<MenuButton className="relative flex rounded-full bg-[#444370] text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#444370] focus:outline-hidden">
									<span className="absolute -inset-1.5" />
									<span className="sr-only">Open user menu</span>
									<img
										alt=""
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										className="size-8 rounded-full"
									/>
								</MenuButton>
							</div>
							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
							>
								<MenuItem>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
									>
										Your Profile
									</a>
								</MenuItem>
								<MenuItem>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
									>
										Settings
									</a>
								</MenuItem>
								<MenuItem>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
									>
										Sign out
									</a>
								</MenuItem>
							</MenuItems>
						</Menu>
					</div>
				</div>
			</div>
		</Disclosure>
	)
}

export default Navbar