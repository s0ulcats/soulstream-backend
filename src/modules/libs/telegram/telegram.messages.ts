import { SessionMetadata } from "@/src/shared/types/session-metadata.type";
import { type SponsorshipPlan, type User } from "@prisma/client";

export const MESSAGES = {
    welcome:
        `<b>👋 Welcome to SoulStream Bot!</b>\n\n` +
        `To receive notifications and improve your experience using the platform, let's link your Telegram account with SoulStream.\n\n` +
        `Click the button below and go to the <b>Notifications</b> section to complete the setup.`,
    authSuccess: `🎉 You have successfully logged in and your Telegram account is linked to SoulStream!\n\n`,
    invalidToken: '❌ Invalid or expired token.',
    profile: (user: User, followersCount: number) =>
        `<b>👤 User profile:</b>\n\n` +
        `👤 Username: <b>${user.username}</b>\n` +
        `📧 Email: <b>${user.email}</b>\n` +
        `👥 Number of subscribers: <b>${followersCount}</b>\n` +
        `📝 About yourself: <b>${user.bio || 'Not specified'}</b>\n\n` +
        `🔧 Click on the button below, to go to profile settings.`,
    follows: (user: User) =>
        `📺 <a href="https://soulstream.com/${user.username}">${user.username}</a>`,
    resetPassword: (token: string, metadata: SessionMetadata) =>
        `<b>🔒 Password reset</b>\n\n` +
        `You have requested a password reset for your <b>SoulStream</b> account.\n\n` +
        `To create a new password, please go to the following link:\n\n` +
        `<b><a href="https://soulstream.com/account/recovery/${token}">Reset password</a></b>\n\n` +
        `📅 <b>Request date:</b> ${new Date().toLocaleDateString()} in ${new Date().toLocaleTimeString()}\n\n` +
        `🖥️ <b>Request information:</b>\n\n` +
        `🌍 <b>Location:</b> ${metadata.location.country}, ${metadata.location.city}\n` +
        `📱 <b>Operating system:</b> ${metadata.device.os}\n` +
        `🌐 <b>Browser:</b> ${metadata.device.browser}\n` +
        `💻 <b>IP address:</b> ${metadata.ip}\n\n` +
        `If ​​you did not make this request, simply ignore this message.\n\n` +
        `Thank you for using <b>SoulStream</b>! 🚀`,
    deactivate: (token: string, metadata: SessionMetadata) =>
        `<b>⚠️ Request for account deactivation</b>\n\n` +
        `You have initiated the process of deactivating your account on the <b>Soulstream</b> platform.\n\n` +
        `To complete the transaction, please confirm your request by entering the following confirmation code:\n\n` +
        `<b>Confirmation code: ${token}</b>\n\n` +
        `📅 <b>Request date:</b> ${new Date().toLocaleDateString()} in ${new Date().toLocaleTimeString()}\n\n` +
        `🖥️ <b>Request information:</b>\n\n` +
        `• 🌍 <b>Location:</b> ${metadata.location.country}, ${metadata.location.city}\n` +
        `• 📱 <b>Operating system:</b> ${metadata.device.os}\n` +
        `• 🌐 <b>Browser:</b> ${metadata.device.browser}\n` +
        `• 💻 <b>IP address:</b> ${metadata.ip}\n\n` +
        `<b>What happens after deactivation?</b>\n\n` +
        `1. You will be automatically logged out and lose access to your account.\n` +
        `2. If you do not cancel deactivation within 7 days, your account will be <b>permanently deleted</b> along with all your information, data and subscriptions.\n\n` +
        `<b>⏳ Please note:</b> If you change your mind within 7 days, you can contact our support to restore access to your account until it is completely deleted.\n\n` +
        `Once your account is deleted, it will be impossible to restore it, and all data will be lost beyond recovery.\n\n` +
        `If ​​you change your mind, simply ignore this message. Your account will remain active.\n\n` +
        `Thank you for using <b>SoulStream</b>! We are always glad to see you on our platform and hope that you will stay with us. 🚀\n\n` +
        `Sincerely,\n` +
        `SoulStream Team`,
    accountDeleted:
        `<b>⚠️ Your account has been completely deleted.</b>\n\n` +
        `Your account has been completely erased from the Soulstream database. All your data and information have been permanently deleted. ❌\n\n` +
        `🔒 You will no longer receive notifications in Telegram and email.\n\n` +
        `If ​​you want to return to the platform, you can register using the following link:\n` +
        `<b><a href="https://soulstream.com/account/create">Register on Soulstream</a></b>\n\n` +
        `Thank you, that they were with us! We will always be glad to see you on the platform. 🚀\n\n` +
        `Sincerely,\n` +
        `SoulStream Team`,
    streamStart: (channel: User) =>
        `<b>📡 The broadcast has started on the channel ${channel.displayName}!</b>\n\n` +
        `Look here: <a href="https://soulstream.com/${channel.username}">Go to broadcast</a>`,
    newFollowing: (follower: User, followersCount: number) =>
        `<b>You have a new follower!</b>\n\nThis is the user <a href="https://soulstream.com/${follower.username}">${follower.displayName}</a>\n\nTotal number of subscribers on your channel: ${followersCount}`,
    newSponsorship: (plan: SponsorshipPlan, sponsor: User) =>
        `<b>🎉 New sponsor!</b>\n\n` +
        `You have received a new sponsorship for the plan <b>${plan.title}</b>.\n` +
        `💰 Amount: <b>${plan.price} ₽</b>\n` +
        `👤 Sponsor: <a href="https://soulstream.com/${sponsor.username}">${sponsor.displayName}</a>\n` +
        `📅 Issue date: <b>${new Date().toLocaleDateString()} in ${new Date().toLocaleTimeString()}</b>`,
    enableTwoFactor:
        `🔐 Ensure your safety!\n\n` +
        `Enable two-factor authentication in <a href="https://soulstream.com/dashboard/settings">account settings</a>.`,
    verifyChannel:
        `<b>🎉 Congratulations! Your channel has been verified</b>\n\n` +
        `We are pleased to announce that your channel is now verified and you have received an official badge.\n\n` +
        `The verification badge confirms the authenticity of your channel and improves the trust of viewers.\n\n` +
        `Thank you for being with us and continuing to develop your channel together with SoulStream!`
}