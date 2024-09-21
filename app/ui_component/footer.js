import React from 'react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
	return (
		<footer className=" text-white py-4">
            <Separator className="bg-[#474747] w-[85%] ml-auto mr-auto mb-8" />
			<div className="container mx-auto text-center">
                <p className='f1f text-2xl sm:text-4xl w-full mb-3 sm:mb-8' align="center">MF</p>
				<p className='fon w-full text-xs sm:hidden '>&copy; {new Date().getFullYear()} In addition to any opt-out feature provided by any of the services listed in this document, Users may follow the instructions provided by Your Online Choices (EU).</p>
<p className='fon w-full block sm:block hidden'>&copy; {new Date().getFullYear()} In addition to any opt-out feature provided by any of the services listed in this document, Users may follow the instructions provided by Your Online Choices (EU), the Network Advertising Initiative (US) and the Digital Advertising Alliance (US), DAAC (Canada), DDAI (Japan) or other similar initiatives. Such initiatives allow Users to select their tracking preferences for most of the advertising tools.</p>

                <br />
                <p>
					
				</p>
			</div>
		</footer>
	);
}