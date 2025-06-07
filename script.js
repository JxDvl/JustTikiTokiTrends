import { trendsData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const trendsContainer = document.getElementById('trends-container');
    if (trendsContainer) {
        renderTrends(trendsData, trendsContainer);
    }
    lucide.createIcons();
});

function highlightStats(text) {
    if (!text) return '';
    const regex = new RegExp('(\\d[\\d,\\.]*\\s*(?:тыс\\.|млн|%|K|))', 'g');
    return text.replace(regex, (match) => `<span class="stat-highlight">${match}</span>`);
}

function renderTrends(data, container) {
    container.innerHTML = '';

    data.categories.forEach(category => {
        category.trends.forEach(trend => {
            const trendCard = document.createElement('div');
            trendCard.className = 'bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80';
            
            let examplesHtml = '';
            if (trend.examples && trend.examples.length > 0) {
                examplesHtml = trend.examples.map(example => `
                    <div class="mt-4 pt-4 border-t border-slate-200/80">
                        <h4 class="font-semibold text-slate-800">${example.name}</h4>
                        <div class="mt-2 flex flex-wrap gap-2">
                            ${example.hashtags.map(tag => `<span class="hashtag-pill">${tag}</span>`).join('')}
                        </div>
                    </div>
                `).join('');
            }
            
            trendCard.innerHTML = `
                <div class="flex items-start sm:items-center gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                        <i data-lucide="${trend.icon}" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900">${trend.name}</h2>
                    </div>
                </div>
                <div class="mt-5 prose prose-slate max-w-none">
                    <p>${trend.description}</p>
                    ${trend.statistics ? `<p><strong>Статистика:</strong> ${highlightStats(trend.statistics)}</p>` : ''}
                </div>
                <div>${examplesHtml}</div>
            `;
            container.appendChild(trendCard);
        });
    });
    

    if (data.summary) {
        const summaryCard = document.createElement('div');
        summaryCard.className = 'bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80';

        const pointsHtml = data.summary.points.map(point => `
            <li class="flex items-start gap-3">
                <i data-lucide="check-circle-2" class="w-5 h-5 text-green-500 mt-1 flex-shrink-0"></i>
                <span>${highlightStats(point)}</span>
            </li>
        `).join('');

        summaryCard.innerHTML = `
            <div class="flex items-start sm:items-center gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                    <i data-lucide="${data.summary.icon}" class="w-6 h-6"></i>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-slate-900">${data.summary.title}</h2>
                </div>
            </div>
            <div class="mt-5 prose prose-slate max-w-none">
                <ul class="space-y-3">
                    ${pointsHtml}
                </ul>
            </div>
        `;
        container.appendChild(summaryCard);
    }
}
