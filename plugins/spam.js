cmd({
    pattern: "spam",
    desc: "Spam messages safely with log visibility",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, reply, q, pushname}) => {
    try {
        // Usage: .spam 10 | Hello
        if (!q.includes('|')) return await reply("❌ Sahi format use karen!\nExample: *.spam 10 | Hello*")

        const split = q.split('|')
        const count = parseInt(split[0].trim())
        const text = split[1].trim()

        // Safety Limits
        if (count > 50) return await reply("❌ Limit exceeded! Max 50 messages allowed.")
        if (isNaN(count)) return await reply("❌ Please enter a valid number.")

        console.log(`🚀 Spam started by ${pushname} in ${from}. Count: ${count}`)

        for (let i = 0; i < count; i++) {
            await conn.sendMessage(from, { text: text })
            
            // Chota sa delay (500ms) taake WhatsApp ban na kare aur bot smoothly chale
            await new Promise(resolve => setTimeout(resolve, 500)) 
        }

        console.log(`✅ Spam successfully completed for ${pushname}`)

    } catch (e) {
        console.log("❌ Spam Error: ", e)
        reply("Error: " + e)
    }
})

