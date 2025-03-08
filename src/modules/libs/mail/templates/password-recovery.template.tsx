import type { SessionMetadata } from '@/shared/types/session-metadata.type'
import * as React from 'react'
import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'

interface PasswordRecoveryProps {
    domain: string
    token: string
    metadata: SessionMetadata
}

export function PasswordRecoveryTemplate({ domain, token, metadata }: PasswordRecoveryProps) {
    const resetLink = `${domain}/account/recovery/${token}`
    return (
        <Html>
            <Head />
            <Preview>Password reset</Preview>
            <Tailwind>
                <Body className='max-w-2xl mx-auto bg-slate-50'>
                    <Section className='text-center mb-8'>
                        <Heading className='text-3xl text-black font-bold'>
                            Password reset
                        </Heading>
                        <Text className='text-base text-black mt-2'>
                            You have requested a password reset for your account.
                        </Text>
                        <Text className='text-base text-black mt-2'>
                            To create a new password, click on the link below:
                        </Text>
                        <Link href={resetLink} className='inline-flex justify-center items-center rounded-full text-sm font-medium text-white bg-[#18B9AE] px-5 py-2'>
                            Password reset
                        </Link>
                    </Section>

                    <Section className='bg-gray-100 rounded-lg p-6 mb-6'>
                        <Heading className='text-xl font-semibold text-[#18B9AE]'>
                            Request Information
                        </Heading>
                        <ul className="list-disc list-inside mt-2 text-black">
                            <li>🌎 Location: {metadata.location.country},
                                {metadata.location.city}</li>
                            <li>📱 Operating system: {metadata.device.os}</ li>
                            <li>🌐 Browser: {metadata.device.browser}</li>
                            <li>💻 ІР: {metadata.ip}</li>
                        </ul>
                        <Text className='text-gray-600 mt-2'>
                        If you did not initiate this request, please ignore this message.
                        </Text>
                    </Section>

                    <Section className='text-center mt-8'>
                        <Text className='text-gray-600'>
                            If you have questions or encounter difficulties,
                            do not hesitate to contact our support team at{'  '}
                            <Link
                                href='mailto:soulhelpteam@gmail.com'
                                className='text-[#18b9ae] underline'>
                                soulhelpteam@gmail.com
                            </Link>
                        </Text>
                    </Section>
                </Body>
            </Tailwind>
        </Html>
    )
}

