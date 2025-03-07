import { Markup } from 'telegraf'

export const BUTTONS = {
	authSuccess: Markup.inlineKeyboard([
		[
			Markup.button.callback('📜 My subscriptions', 'follows'),
			Markup.button.callback('👤 View profile', 'me')
		],
		[Markup.button.url('🌐 To the site', 'https://soulstream.com')]
	]),
	profile: Markup.inlineKeyboard([
		Markup.button.url(
'⚙️ Account settings',
			'https://soulstream.com/dashboard/settings'
		)
	])
}