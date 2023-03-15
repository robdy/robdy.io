const visit = require("unist-util-visit")

module.exports = ({ markdownAST }, pluginOptions) => {
	visit(markdownAST, node => {
		try {
			if (node.type === 'html' && node.value.match(/<div class="gatsby-highlight" data-language/g)) {
				// console.log(node)
				const newText = `
			<section class='codeheader-section'>
					<div class='codeheader flex'>
					<span class='codeheader-language'>powershell</span>
					<button class='codeheader-button'>Wrap: OFF</button>
				</div>
			</section>
			${node.value}
			`
				node.value = newText
				return
			}
				} catch (e) {
					console.log(e);
				}

		return
	})
	return markdownAST
}