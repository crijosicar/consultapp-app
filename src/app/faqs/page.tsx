'use client';

import {ReactElement} from "react";

export default function Faqs(): ReactElement {
    return (
        <div className="relative h-screen w-full lg:ps-64">
            <div className="py-10 lg:py-14">
                {/* FAQ */}
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    {/* Grid */}
                    <div className={'m-20 flex flex-col'}>
                        <div className="grid md:grid-cols-5 gap-10">
                            <div className="md:col-span-2">
                                <div className="max-w-xs">
                                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
                                        Frequently
                                        <br/>
                                        asked questions
                                    </h2>
                                    <p className="mt-1 hidden md:block text-gray-600">
                                        Answers to the most frequently asked questions.
                                    </p>
                                </div>
                            </div>
                            {/* End Col */}
                            <div className="md:col-span-3">
                                {/* Accordion */}
                                <div className="hs-accordion-group divide-y divide-gray-200">
                                    <div
                                        className="hs-accordion pb-3 active"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                    >
                                        <button
                                            className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500"
                                            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                        >
                                            How to apply for a Visitor visa to Canada from Colombia?
                                            <svg
                                                className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m6 9 6 6 6-6"/>
                                            </svg>
                                            <svg
                                                className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m18 15-6-6-6 6"/>
                                            </svg>
                                        </button>
                                        <div
                                            id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                        >
                                            <div className="text-gray-600">
                                                <h1>Guide to Applying for a Canadian Visitor Visa from Colombia</h1>
                                                <h2>Steps:</h2>
                                                <ol>
                                                    <li><strong>Determine Eligibility:</strong> Confirm that you meet
                                                        all requirements for the visa.
                                                    </li>
                                                    <li><strong>Gather Documentation:</strong> Collect necessary
                                                        documents such as passport, financial proof, travel itinerary,
                                                        invitation letter, and photographs.
                                                    </li>
                                                    <li><strong>Complete the Application:</strong> Fill out the visa
                                                        application form, either online or on paper.
                                                    </li>
                                                    <li><strong>Pay the Fees:</strong> Pay the application fees online
                                                        during the application process.
                                                    </li>
                                                    <li><strong>Submit Biometrics:</strong> Provide your biometrics at a
                                                        designated Visa Application Centre in Colombia.
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="hs-accordion pt-6 pb-3"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-two"
                                    >
                                        <button
                                            className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500"
                                            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two"
                                        >
                                            As a Colombian, do I need a VISA to enter Canada?
                                            <svg
                                                className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m6 9 6 6 6-6"/>
                                            </svg>
                                            <svg
                                                className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m18 15-6-6-6 6"/>
                                            </svg>
                                        </button>
                                        <div
                                            id="hs-basic-with-title-and-arrow-stretched-collapse-two"
                                            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two"
                                        >
                                            <p className="text-gray-600">
                                                Yes, as a Colombian citizen, you generally need a visa to enter Canada.
                                                This can be either a Visitor Visa (Temporary Resident Visa) for short
                                                stays, or the appropriate type of visa depending on the purpose of your
                                                visit (such as work, study, or permanent immigration). Alternatively, if
                                                you are traveling by air, you might consider applying for an Electronic
                                                Travel Authorization (eTA) if you meet specific conditions, like having
                                                held a Canadian visa in the past ten years or currently holding a valid
                                                United States nonimmigrant visa.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="hs-accordion pt-6 pb-3"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-three"
                                    >
                                        <button
                                            className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500"
                                            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three"
                                        >
                                            How much is the cost for a Canadian visitor visa from Colombia?
                                            <svg
                                                className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m6 9 6 6 6-6"/>
                                            </svg>
                                            <svg
                                                className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m18 15-6-6-6 6"/>
                                            </svg>
                                        </button>
                                        <div
                                            id="hs-basic-with-title-and-arrow-stretched-collapse-three"
                                            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three"
                                        >
                                            <p className="text-gray-600">
                                                The fee for a Canadian Visitor Visa (Temporary Resident Visa) is
                                                typically CAD $100 per person. In addition to the application fee, you
                                                might also have to pay for biometrics, which costs CAD $85. If you are
                                                applying as a family, a maximum total fee for biometrics is CAD $170.

                                                These fees are subject to change, so it's a good idea to check the
                                                official Immigration, Refugees and Citizenship Canada (IRCC) website or
                                                consult with the nearest Canadian embassy or consulate for the most
                                                up-to-date information.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="hs-accordion pt-6 pb-3"
                                        id="hs-basic-with-title-and-arrow-stretched-heading-four"
                                    >
                                        <button
                                            className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500"
                                            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-four"
                                        >
                                            What is the processing time for Colombians applying for a Visitor VISA to
                                            Canada?
                                            <svg
                                                className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m6 9 6 6 6-6"/>
                                            </svg>
                                            <svg
                                                className="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m18 15-6-6-6 6"/>
                                            </svg>
                                        </button>
                                        <div
                                            id="hs-basic-with-title-and-arrow-stretched-collapse-four"
                                            className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                                            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-four"
                                        >
                                            <p className="text-gray-600">
                                                As of my last update, the processing time for a Canadian Visitor Visa
                                                for applicants from Colombia can vary significantly depending on a
                                                number of factors such as the volume of applications received, the
                                                completeness of the application, and individual circumstances of the
                                                applicant.

                                                Generally, the processing time can range from a few weeks to several
                                                months. However, it's a good practice to check the most current
                                                processing times on the official Immigration, Refugees and Citizenship
                                                Canada (IRCC) website, as these times are updated regularly based on
                                                actual processing conditions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* End Accordion */}
                            </div>
                            {/* End Col */}
                        </div>
                    </div>
                    {/* End Grid */}
                </div>
                {/* End FAQ */}
            </div>
        </div>
    );
}
