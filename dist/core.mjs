export const FIELD_NAMES = {capital:'投入資金',value:'目前價值',income:'本月領息',total:'累積領息',units:'本月累積單位'};
export const DEFAULT_COPY = {
 greeting:'💸 ～ 領錢錢囉 ～💸',paymentDate:'',market:'',
 promotion:'🔊工商時間🔊\n\n汽機車強制險+任意險\n\n持續服務中\n\n毒駕酒駕頻傳\n\n有全險好放心\n\n車禍調解不用愁',
 recruitment:'👍人才招募👍\n\n如果你有\n\n曾經考過保險證照但沒有在使用\n\n曾經從事過保險業但沒有繼續發展的朋友\n\n歡迎幫小剛介紹認識認識喲'
};
export function normalizeNumber(raw){return String(raw??'').normalize('NFKC').replace(/[,，\s]/g,'');}
export function validNumber(raw){return /^\d+(?:\.\d+)?$/.test(normalizeNumber(raw));}
export function formatNumber(raw){const v=normalizeNumber(raw);if(!validNumber(v))return '—';const [whole,dec]=v.split('.');const clean=whole.replace(/^0+(?=\d)/,'');return clean.replace(/\B(?=(\d{3})+(?!\d))/g,',')+(dec===undefined?'':'.'+dec);}
export function newPolicy(){return {name:'',type:'income',capital:'',value:'',income:'',total:'',units:''};}
export function activeFields(policy){return policy.type==='units'?['capital','value','units']:['capital','value','income','total'];}
export function validationErrors(policies){return policies.flatMap((p,index)=>activeFields(p).filter(key=>!validNumber(p[key])).map(key=>({index,key,message:normalizeNumber(p[key])===''?'請輸入數字（沒有時填 0）':'請輸入 0 或正數，可使用小數與千分位'})));}
export function buildMessage(policies,copy){const blocks=[];if(copy.greeting.trim())blocks.push(copy.greeting.trim());policies.forEach((p,i)=>{const lines=[];if(p.name.trim())lines.push('【'+p.name.trim()+'】');else if(policies.length>1)lines.push('【保單 '+(i+1)+'】');for(const key of activeFields(p)){const num=formatNumber(p[key]);lines.push(FIELD_NAMES[key]+'：'+num+(num==='—'?'':key==='units'?' 單位':['capital','value'].includes(key)?'萬':' 元'));}blocks.push(lines.join('\n'));});if(copy.paymentDate?.trim())blocks.push('預計配息入帳日：'+copy.paymentDate.trim()+' 前');for(const key of ['market','promotion','recruitment'])if(copy[key].trim())blocks.push(copy[key].trim());return blocks.join('\n\n');}
