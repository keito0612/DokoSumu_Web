'use client';
import NavBar from "../components/NavBar";
import NavigationBottomBar from "../components/NavigationBottomBar";
import PageHeader from "../components/PageHeader";


function PrivacyPolicyPage() {
  return (
    <>
      <NavBar title="プライバシーポリシー" onBack={true} />

      <div className='relative flex w-full min-h-screen flex-col bg-gray-50 overflow-x-hidden'>
        <div className="px-4 sm:px-20 flex flex-1 justify-center py-5 pt-16 pb-24 sm:pb-5 md:pb-5 lg:pb-5 2xl:pb-5 xl:pb-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <PageHeader title={"プライバシーポリシー"} />
            <div className='bg-white rounded-lg shadow-md p-6 sm:p-8 mt-2'>
              <div className="space-y-6 text-gray-700">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">プライバシーポリシー</h1>
                  <p className="text-sm text-gray-600 mb-6">最終更新日: 2025年10月25日</p>
                  <p className="mb-4">
                    PrefReview（以下「当サービス」）は、ユーザーの皆様のプライバシーを尊重し、個人情報の保護に努めます。本プライバシーポリシーは、当サービスがどのように情報を収集、使用、保護するかを説明するものです。
                  </p>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 収集する情報</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 アカウント情報</h3>
                  <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
                    <li>メールアドレス</li>
                    <li>ユーザー名</li>
                    <li>パスワード（暗号化して保存）</li>
                    <li>プロフィール情報（任意で登録された情報）</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.2 投稿情報</h3>
                  <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
                    <li>レビュー内容（評価、コメント、写真）</li>
                    <li>評価対象の都道府県・市区町村</li>
                    <li>投稿日時</li>
                    <li>治安、子育て、制度、交通機関、住みやすさの5段階評価</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.3 自動的に収集される情報</h3>
                  <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
                    <li>IPアドレス</li>
                    <li>ブラウザの種類とバージョン</li>
                    <li>アクセス日時</li>
                    <li>利用状況データ</li>
                    <li>Cookieおよび類似技術による情報</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 情報の利用目的</h2>
                  <p className="mb-3">当サービスは、収集した情報を以下の目的で利用します。</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>サービスの提供、維持、改善</li>
                    <li>ユーザーアカウントの管理</li>
                    <li>ユーザー間のコミュニケーション機能の提供</li>
                    <li>不正利用の防止およびセキュリティの確保</li>
                    <li>カスタマーサポートの提供</li>
                    <li>利用規約違反の調査および対応</li>
                    <li>サービスに関する重要なお知らせの配信</li>
                    <li>統計データの作成（個人を特定できない形式）</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 情報の共有と開示</h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 公開情報</h3>
                  <p className="mb-4">
                    以下の情報は、当サービスの他のユーザーに公開されます。
                  </p>
                  <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
                    <li>ユーザー名</li>
                    <li>プロフィール情報（公開設定されたもの）</li>
                    <li>投稿したレビューおよび評価</li>
                    <li>投稿した写真</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 第三者への開示</h3>
                  <p className="mb-4">
                    当サービスは、以下の場合を除き、ユーザーの個人情報を第三者に開示しません。
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>ユーザーの同意がある場合</li>
                    <li>法令に基づく開示が必要な場合</li>
                    <li>人の生命、身体または財産の保護のために必要な場合</li>
                    <li>サービス提供に必要な業務委託先（適切な管理のもと）</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 情報の保存期間</h2>
                  <p className="mb-3">
                    当サービスは、以下の期間、ユーザー情報を保存します。
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>アカウント情報: アカウント削除まで</li>
                    <li>投稿情報: ユーザーが削除するまで、またはアカウント削除時</li>
                    <li>ログ情報: 最大1年間</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. セキュリティ</h2>
                  <p>
                    当サービスは、ユーザーの個人情報を保護するため、適切な技術的・組織的セキュリティ対策を実施しています。ただし、インターネット上での情報伝達の完全な安全性を保証することはできません。
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookieの使用</h2>
                  <p className="mb-3">
                    当サービスは、サービスの改善とユーザー体験の向上のためにCookieを使用します。ブラウザの設定により、Cookieの受け入れを拒否することができますが、その場合、サービスの一部機能が利用できなくなる可能性があります。
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. ユーザーの権利</h2>
                  <p className="mb-3">ユーザーは、以下の権利を有します。</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>自己の個人情報へのアクセス権</li>
                    <li>個人情報の訂正・更新を求める権利</li>
                    <li>個人情報の削除を求める権利</li>
                    <li>データポータビリティの権利</li>
                  </ul>
                  <p className="mt-3">
                    これらの権利を行使したい場合は、設定ページまたはお問い合わせフォームからご連絡ください。
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. 未成年者の利用</h2>
                  <p>
                    当サービスは、13歳未満の方による利用を想定していません。13歳未満の方は、保護者の同意なく当サービスを利用しないでください。
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. プライバシーポリシーの変更</h2>
                  <p>
                    当サービスは、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更がある場合は、サービス内で通知します。変更後も継続してサービスを利用された場合、変更に同意したものとみなされます。
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. お問い合わせ</h2>
                  <p>
                    本プライバシーポリシーに関するご質問やご意見がございましたら、以下の連絡先までお問い合わせください。
                  </p>
                  <div className="mt-4 p-4 bg-gray-100 rounded">
                    <p className="font-semibold">PrefReview運営チーム</p>
                    <p>メールアドレス: privacy@PrefReview.example.com</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavigationBottomBar />
    </>
  );
}

export default PrivacyPolicyPage;